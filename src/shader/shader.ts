export interface IShadersSource {
  vertix: string;
  fragment: string;
};
const getShadersSource = (pathWithoutExt: string): IShadersSource => ({
  vertix: require(`${pathWithoutExt}.vert`),
  fragment: require(`${pathWithoutExt}.frag`),
});
const getShadersSourceArray = (pathWithoutExt: string) =>
  ((_): [string, string] => [_.vertix, _.fragment])(getShadersSource(pathWithoutExt));

export const basicShadersSourceArray = getShadersSourceArray('./basic/basic');
