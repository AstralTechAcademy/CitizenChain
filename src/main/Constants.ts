export const smartContracts = {

  DNS                 : "0x55a4eDd8A2c051079b426E9fbdEe285368824a89",
  ACCESS_CONTROL      : "0xAE7EC7f2b07Dcb9F480619E9E5A95216B539f13F",
  CIVIL_REGISTER      : "0xe820D68E02Dd7D82f73b3B5E20732C09DE7829DA",

  ACADEMIC_APP        : "0xb88411ca0b54a13Fd9ca21dda5C3875C0F6D521A",
  EDUCATION_DATA      : "0xD5413BEd1A46b67a905a988836b577ecAd6F4670",

  HEALTH_SYSTEM       : "0x0ed990386a5Cc180302784579aeDD9753FfeA909",
  HEALTH_DATA         : "0x92D61BD16b20A3d405Abe2a52E2A03bd7038c3CB",

  EDUCA_FUJI          : "0xCA8072F3e74a2BA34F11971a9EdF4d8D8Bd97CD7"
  
} as const;

export enum eRole
{
    NONE,
    VIEWER,
    WRITER,
    ADMIN
}
