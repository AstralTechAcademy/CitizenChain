export const smartContracts = {

  DNS                 : "0x55a4eDd8A2c051079b426E9fbdEe285368824a89",
  ACCESS_CONTROL      : "0x923A66859C84293D2577b4E747EeC91AEc0AB55f",
  CIVIL_REGISTER      : "0xF4FED7834Fb095180b892178Ce76e136B2Ac2824",

  HEALTH_SYSTEM       : "0xFD119eA8F450E66d6aA6337E12A1c612d7b26EC0",
  DOCTORS             : "0x3c44dEAE8F4E1A034B3385b449673b795357271D",
  PHARMACIST          : "0x88ad4610E924769a51c6012f84285cC2E2A4f9E5",
  DISPATCH            : "0x4F508550A3dA33711dA257B8b1539BbE3b91e180",
  PRESCRIPTION        : "0x5dCca90E39C746e46F26158E35d80c3802E60A3a",
  LABORATORY          : "0xCcaA6bD2F5683BB72C5AFf07a33c9Ae7b7e6283a",
  MEDICINE            : "0x0E6920d30D886CD45a93be9D6252672439f8207C",
  
  ACADEMIC_APP        : "0x26F2CeD598c678a42D0F100B49053827037c96cc",
  TITLES              : "0x0a73d55951d392292639A8239129C4d7569765cC",
  INSTITUTIONS        : "0x0E036eE7f2b7aEBA7406d83ebbf875ACc0510C3d",
  DEGREES             : "0x3bc883C6Bc0bb832987C7dfD132649133B77A3Fc",
  INS_DEGREES         : "0x5b0d1B76e76A96ba1465D99C360ca310C2362Ff1",
  DEGREES_STUDENTS    : "0x7F9F8dB6c3523E93404067Cb4ffcEB8834d4574f",

  EDUCA_FUJI          : "0x2e2acA39e1B5AF1DA480820fD8F202E6A37421a1"
  
} as const;

export enum eRole
{
    NONE,
    VIEWER,
    WRITER,
    ADMIN
}
