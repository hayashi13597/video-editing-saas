import { DynamicFormData } from "@/features/dashboard/projects/create/validate";

export const defaultValuesMap: Record<
  DynamicFormData["type"],
  DynamicFormData
> = {
  チラシ作成: {
    type: "チラシ作成",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    size: [],
    customSize: "",
    sides: "",
    printOption: "",

    catchCopy: "",
    serviceDescription: "",
    contactInfo: "",
    photoLogos: [],
    qrCodes: [],

    atmosphere: [],
    customAtmosphere: "",
    colorPreferences: "",
    referenceDesigns: [],

    purpose: "",
    customPurpose: "",
    targetAudience: "",
    deliverySchedule: "",

    agreements: []
  },

  LP修正依頼: {
    type: "LP修正依頼",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    targetUrl: "",
    modificationDetails: [
      {
        modificationLocation: "",
        currentContent: "",
        modifiedContent: "",
        modificationNotes: ""
      }
    ],
    replacementImages: [],
    replacementText: [],
    modificationPurpose: [],
    customModificationPurpose: "",
    desiredDeadline: "",

    agreements: []
  },

  動画編集: {
    type: "動画編集",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    videoUsage: [],
    customVideoUsage: "",
    videoDuration: "",
    aspectRatio: "",
    sourceVideoUrl: "",
    sourceVideoUploadUrl: "",
    sourceVideoUploadMethod: "",
    additionalImages: [],
    bgmRequirements: "",
    editingStyle: [],
    customEditingStyle: "",
    subtitleStyle: "",
    cuttingInstructions: "",
    graphicsRequirements: "",
    ngItems: "",
    referenceVideos: "",
    additionalInstructions: "",
    desiredDeadline: "",
    intermediateCheck: "",

    agreements: []
  },

  名刺作成: {
    type: "名刺作成",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    quantity: "",
    printOption: "",
    sides: "",
    fullName: "",
    nameReading: "",
    jobTitle: "",
    companyName: "",
    contactInfo: "",
    address: "",
    socialMediaUrls: "",
    designStyle: [],
    customDesignStyle: "",
    colorPreferences: "",
    logoPhotos: [],
    referenceImages: [],
    paperQualitySize: "",
    additionalRequirements: "",
    desiredSchedule: "",

    agreements: []
  },

  バナー作成: {
    type: "バナー作成",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    bannerTypes: [],
    customBannerType: "",
    sizeSpecification: "",
    quantity: "",
    mainCatchCopy: "",
    subCopy: "",
    requiredInformation: "",
    targetAudience: "",
    desiredEffect: [],
    customDesiredEffect: "",
    designAtmosphere: [],
    customDesignAtmosphere: "",
    colorPreferences: "",
    logoPhotos: [],
    referenceBannersMethod: "",
    referenceBannersUpload: [],
    referenceBannerUrls: "",
    desiredDeliveryDate: "",
    intermediateCheckTiming: "",

    agreements: []
  },

  Instagram投稿: {
    type: "Instagram投稿",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    postFormats: [],
    customPostFormat: "",
    postPurposes: [],
    customPostPurpose: "",
    headline: "",
    bodyText: "",
    hashtags: "",
    tagInfo: "",
    designStyles: [],
    customDesignStyle: "",
    colorPreferences: "",
    assetsMethod: "",
    assetsUrls: [],
    assetsUpload: [],
    referencePosts: [],
    reelDuration: "",
    subtitles: "",
    musicPreference: "",
    desiredDeadline: "",
    scheduleNotes: "",

    agreements: []
  },

  SEO記事作成: {
    type: "SEO記事作成",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    publicationTarget: "",
    wordCountDescription: "",
    deliveryFormat: "",
    mainKeyword: "",
    subKeywords: "",
    searchIntents: [],
    customSearchIntent: "",
    targetReader: "",
    desiredStructure: "",
    referenceArticlesMethod: "",
    referenceArticlesUpload: [],
    referenceArticlesUrls: "",
    tones: [],
    customTone: "",
    sentenceStyle: "です・ます調",
    callToAction: "",
    desiredDeadline: "",
    firstDraftCheckDate: "",

    agreements: []
  },

  サムネイル作成: {
    type: "サムネイル作成",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    platforms: [],
    customPlatform: "",
    videoTitle: "",
    imageSizes: [],
    customSize: "",
    headlineText: "",
    designTones: [],
    customDesignTone: "",
    colorPreferences: "",
    assets: [],
    referenceThumbnailsMethod: "",
    referenceThumbnailsUpload: [],
    referenceThumbnailsUrls: "",
    desiredDeadline: "",
    intermediateCheck: "",

    agreements: []
  },

  LINE構築: {
    type: "LINE構築",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    lineType: "LINE公式アカウント（通常）",
    customLineType: "",
    objectives: [],
    customObjective: "",
    serviceDescription: "",
    targetAudience: "",
    expectedFlow: "",
    stepMessagingPlan: "",
    richMenuItems: "",
    existingAssets: [],
    externalLinks: "",
    designPreference: "おまかせ（トンマナだけ伝える）",
    designDetails: "",
    referenceAccounts: "",
    desiredDeadline: "",
    otherRequests: "",

    agreeModificationLimit: true,
    agreeMaterialDelay: true,
    agreeLineSpecChanges: true,
    agreeEffectDisclaimer: true
  },

  台本作成: {
    type: "台本作成",
    title: "",
    description: "",
    consumePoints: undefined,
    deadline: "",
    visibility: "public",

    platforms: [],
    customPlatform: "",
    videoDuration: [],
    videoGoals: [],
    customVideoGoal: "",
    targetAudience: "",
    desiredImpression: "",
    scriptStyles: [],
    customScriptStyle: "",
    tonePreferences: [],
    customTonePreference: "",
    keyElements: [],
    requiredKeywords: "",
    ngKeywords: "",
    referencePosts: [],
    pastExamples: [],
    desiredDeadline: "",
    otherRequests: "",

    agreeDirectionChangePolicy: true,
    agreeModificationLimit: true,
    agreeEffectDisclaimer: true,
    agreeMaterialDelay: true
  }
};

export type DefaultValuesMapKeys = keyof typeof defaultValuesMap;
