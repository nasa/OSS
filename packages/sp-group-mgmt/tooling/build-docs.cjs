const filesys = require("fs");
const jsdoc2md = require("jsdoc-to-markdown");
const _ = require("lodash");
const minimist = require("minimist");
const path = require("path");

const markdownTableOfContents = `
# Table of Contents
* [Overview](/docs/overview.md)
* API Documentation
`;
const params = { config: ".\\jsdoc2md.conf.json", out: ".\\docs", src: ".\\src", ...minimist(process.argv.slice(2)) };
const config = JSON.parse(filesys.readFileSync(path.join(process.cwd(), params.config)));
const pathInput = path.join(process.cwd(), params.src);
const pathOutput = path.join(process.cwd(), params.out);

const documentDirectory = (pathSource, pathDest) =>
{
  const documentFiles = (err, files) =>
  {
    const documentFile = (file) =>
    {
      const outputMarkdown = jsdoc2md.renderSync({ ...config, files: path.join(pathSource, file) });
      if (outputMarkdown)
      {
        filesys.writeFileSync(path.resolve(pathDest, file.replace(/\.[^.]+$/, ".md")), outputMarkdown);
      }
    };
    const recurseDir = (dir) =>
    {
      if (!filesys.existsSync(path.join(pathDest, dir)))
      {
        filesys.mkdirSync(path.join(pathDest, dir));
      }
      documentDirectory(path.join(pathSource, dir), path.join(pathDest, dir));
    };
    const isDir = (file) => (filesys.statSync(path.join(pathSource, file)).isDirectory());
    const isFile = (file) => (filesys.statSync(path.join(pathSource, file)).isFile());
    const isScript = (file) => (file.match(/\.jsx?$/));
    if (err)
    {
      err.message = `Failed to document "${path.join(pathSource)}":\n${err.message}`;
      throw err;
    }
    files.filter(isFile).filter(isScript).forEach(documentFile);
    files.filter(isDir).forEach(recurseDir);
  };
  filesys.readdir(pathSource, documentFiles);
};

const writeOutline = (pathSource, pathDest) =>
{
  const generateVariables = (outline, prefix = "  * ") =>
  {
    const mapClass = (entry) => (`${prefix}[${entry.name}](${entry.path})`);
    const mapList = ([key, value]) => (`${prefix}${key}\n${generateVariables(value, "  " + prefix)}`);
    return Array.isArray(outline) ? outline.map(mapClass).join("\n") : Object.entries(outline).map(mapList).join("\n");
  };

  const outlineDirectory = (pathSource) =>
  {
    const outlineFiles = (files) =>
    {
      const outlineFile = (file) =>
      {
        const filterClass = (entry) =>
        {
          const mapTag = ({ tag }) => (tag);
          return (entry.kind === "class") ||
            (_.intersection((entry.customTags || []).map(mapTag), ["component", "hook"]).length);
        };
        const mapClassWithDest = (entry) =>
        {
          const hrefPath = path.join(pathSource, file.replace(/\.[^.]+$/, ".md"))
            .replace(pathInput, params.out)
            .replace(/^\./, "").replace(/\\/g, "/");
          return ({ ...entry, path: `${hrefPath}#${entry.name}` });
        };
        const dataTemplate = jsdoc2md.getTemplateDataSync({ files: path.join(pathSource, file) });
        return dataTemplate.filter(filterClass).map(mapClassWithDest);
      };
      const reduceDir = (result, dir) =>
      {
        const outline = outlineDirectory(path.join(pathSource, dir));
        if (outline && Object.keys(outline).length)
        {
          result[dir] = outline;
        }
        return result;
      };
      const reduceFile = (result, file) =>
      {
        const outline = outlineFile(file);
        if (outline.length)
        {
          result[file.replace(/\.[^.]+$/, "")] = outline;
        }
        return result;
      };
      const isDir = (file) => (filesys.statSync(path.join(pathSource, file)).isDirectory());
      const isFile = (file) => (filesys.statSync(path.join(pathSource, file)).isFile());
      const isScript = (file) => (file.match(/\.jsx?$/));
      return {
        ...files.filter(isDir).reduce(reduceDir, {}),
        ...files.filter(isFile).filter(isScript).reduce(reduceFile, {})
      };
    };
    return outlineFiles(filesys.readdirSync(pathSource));
  };
  const markdownOutline = generateVariables(outlineDirectory(pathSource));
  filesys.writeFileSync(path.resolve(pathDest, "contents.md"), markdownTableOfContents + markdownOutline);
};

documentDirectory(pathInput, pathOutput);
writeOutline(pathInput, pathOutput);
