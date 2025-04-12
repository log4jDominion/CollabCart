import fs from "fs"
import path from "path"

// Define data file paths
const DATA_DIR = path.join(process.cwd(), "data")
const USERS_FILE = path.join(DATA_DIR, "users.json")
const INFLUENCER_PROFILES_FILE = path.join(DATA_DIR, "influencer-profiles.json")
const COMPANY_PROFILES_FILE = path.join(DATA_DIR, "company-profiles.json")
const SOCIAL_ACCOUNTS_FILE = path.join(DATA_DIR, "social-accounts.json")
const CAMPAIGNS_FILE = path.join(DATA_DIR, "campaigns.json")
const PROFILE_UNLOCKS_FILE = path.join(DATA_DIR, "profile-unlocks.json")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize files if they don't exist
const initializeFile = (filePath: string, defaultData: any = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2))
  }
}

// Initialize all data files
initializeFile(USERS_FILE)
initializeFile(INFLUENCER_PROFILES_FILE)
initializeFile(COMPANY_PROFILES_FILE)
initializeFile(SOCIAL_ACCOUNTS_FILE)
initializeFile(CAMPAIGNS_FILE)
initializeFile(PROFILE_UNLOCKS_FILE)

// Generic read function
const readData = <T>(filePath: string): T => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [] as unknown as T;
  }
};

// Generic write function
const writeData = <T>(filePath: string, data: T): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
  }
};

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: 'influencer' | 'company';
  createdAt: string;
  updatedAt: string;
}

export interface InfluencerProfile {
  id: string;
  userId: string;
  bio: string;
  location: string;
  categories: string[];
  priceRange: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyProfile {
  id: string;
  userId: string;
  website: string;
  industry: string;
  description: string;
  location: string;
  size: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialAccount {
  id: string;
  influencerId: string;
  platform: string;
  username: string;
  profileUrl: string;
  followers: number;
  engagement: number;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  companyId: string;
  name: string;
  description: string;
  category: string;
  budget: string;
  targetAudience: string;
  targetLocation: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  influencers: string[]; // Array of influencer IDs
}

export interface ProfileUnlock {
  id: string;
  companyId: string;
  influencerId: string;
  paymentIntentId: string;
  unlockDate: string;
}

// User operations
export const getUsers = (): User[] => {
  return readData<User[]>(USERS_FILE);
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const hashedPassword = await hash(userData.password, 10);
  
  const newUser: User = {
    id: uuidv4(),
    ...userData,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  writeData(USERS_FILE, users);
  
  return newUser;
};

export const validateUser = async (email: string, password: string): Promise<User | null> => {
  const user = getUserByEmail(email);
  
  if (!user) {
    return null;
  }
  
  const isPasswordValid = await compare(password, user.password);
  
  if (!isPasswordValid) {
    return null;
  }
  
  return user;
};

export const updateUser = (id: string, userData: Partial<User>): User | null => {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedUser = {
    ...users[index],
    ...userData,
    updatedAt: new Date().toISOString(),
  };
  
  users[index] = updatedUser;
  writeData(USERS_FILE, users);
  
  return updatedUser;
};

// Influencer profile operations
export const getInfluencerProfiles = (): InfluencerProfile[] => {
  return readData<InfluencerProfile[]>(INFLUENCER_PROFILES_FILE);
};

export const getInfluencerProfileById = (id: string): InfluencerProfile | undefined => {
  const profiles = getInfluencerProfiles();
  return profiles.find(profile => profile.id === id);
};

export const getInfluencerProfileByUserId = (userId: string): InfluencerProfile | undefined => {
  const profiles = getInfluencerProfiles();
  return profiles.find(profile => profile.userId === userId);
};

export const createInfluencerProfile = (profileData: Omit<InfluencerProfile, 'id' | 'createdAt' | 'updatedAt'>): InfluencerProfile => {
  const profiles = getInfluencerProfiles();
  
  const newProfile: InfluencerProfile = {
    id: uuidv4(),
    ...profileData,
    categories: profileData.categories || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  profiles.push(newProfile);
  writeData(INFLUENCER_PROFILES_FILE, profiles);
  
  return newProfile;
};

export const updateInfluencerProfile = (id: string, profileData: Partial<InfluencerProfile>): InfluencerProfile | null => {
  const profiles = getInfluencerProfiles();
  const index = profiles.findIndex(profile => profile.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedProfile = {
    ...profiles[index],
    ...profileData,
    updatedAt: new Date().toISOString(),
  };
  
  profiles[index] = updatedProfile;
  writeData(INFLUENCER_PROFILES_FILE, profiles);
  
  return updatedProfile;
};

// Company profile operations
export const getCompanyProfiles = (): CompanyProfile[] => {
  return readData<CompanyProfile[]>(COMPANY_PROFILES_FILE);
};

export const getCompanyProfileById = (id: string): CompanyProfile | undefined => {
  const profiles = getCompanyProfiles();
  return profiles.find(profile => profile.id === id);
};

export const getCompanyProfileByUserId = (userId: string): CompanyProfile | undefined => {
  const profiles = getCompanyProfiles();
  return profiles.find(profile => profile.userId === userId);
};

export const createCompanyProfile = (profileData: Omit<CompanyProfile, 'id' | 'createdAt' | 'updatedAt'>): CompanyProfile => {
  const profiles = getCompanyProfiles();
  
  const newProfile: CompanyProfile = {
    id: uuidv4(),
    ...profileData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  profiles.push(newProfile);
  writeData(COMPANY_PROFILES_FILE, profiles);
  
  return newProfile;
};

export const updateCompanyProfile = (id: string, profileData: Partial<CompanyProfile>): CompanyProfile | null => {
  const profiles = getCompanyProfiles();
  const index = profiles.findIndex(profile => profile.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedProfile = {
    ...profiles[index],
    ...profileData,
    updatedAt: new Date().toISOString(),
  };
  
  profiles[index] = updatedProfile;
  writeData(COMPANY_PROFILES_FILE, profiles);
  
  return updatedProfile;
};

// Social account operations
export const getSocialAccounts = (): SocialAccount[] => {
  return readData<SocialAccount[]>(SOCIAL_ACCOUNTS_FILE);
};

export const getSocialAccountsByInfluencerId = (influencerId: string): SocialAccount[] => {
  const accounts = getSocialAccounts();
  return accounts.filter(account => account.influencerId === influencerId);
};

export const createSocialAccount = (accountData: Omit<SocialAccount, 'id' | 'createdAt' | 'updatedAt'>): SocialAccount => {
  const accounts = getSocialAccounts();
  
  const newAccount: SocialAccount = {
    id: uuidv4(),
    ...accountData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  accounts.push(newAccount);
  writeData(SOCIAL_ACCOUNTS_FILE, accounts);
  
  return newAccount;
};

export const updateSocialAccount = (id: string, accountData: Partial<SocialAccount>): SocialAccount | null => {
  const accounts = getSocialAccounts();
  const index = accounts.findIndex(account => account.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedAccount = {
    ...accounts[index],
    ...accountData,
    updatedAt: new Date().toISOString(),
  };
  
  accounts[index] = updatedAccount;
  writeData(SOCIAL_ACCOUNTS_FILE, accounts);
  
  return updatedAccount;
};

// Campaign operations
export const getCampaigns = (): Campaign[] => {
  return readData<Campaign[]>(CAMPAIGNS_FILE);
};

export const getCampaignById = (id: string): Campaign | undefined => {
  const campaigns = getCampaigns();
  return campaigns.find(campaign => campaign.id === id);
};

export const getCampaignsByCompanyId = (companyId: string): Campaign[] => {
  const campaigns = getCampaigns();
  return campaigns.filter(campaign => campaign.companyId === companyId);
};

export const getCampaignsForInfluencer = (influencerId: string): Campaign[] => {
  const campaigns = getCampaigns();
  return campaigns.filter(campaign => campaign.influencers.includes(influencerId));
};

export const createCampaign = (campaignData: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Campaign => {
  const campaigns = getCampaigns();
  
  const newCampaign: Campaign = {
    id: uuidv4(),
    ...campaignData,
    influencers: campaignData.influencers || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  campaigns.push(newCampaign);
  writeData(CAMPAIGNS_FILE, campaigns);
  
  return newCampaign;
};

export const updateCampaign = (id: string, campaignData: Partial<Campaign>): Campaign | null => {
  const campaigns = getCampaigns();
  const index = campaigns.findIndex(campaign => campaign.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedCampaign = {
    ...campaigns[index],
    ...campaignData,
    updatedAt: new Date().toISOString(),
  };
  
  campaigns[index] = updatedCampaign;
  writeData(CAMPAIGNS_FILE, campaigns);
  
  return updatedCampaign;
};

// Profile unlock operations
export const getProfileUnlocks = (): ProfileUnlock[] => {
  return readData<ProfileUnlock[]>(PROFILE_UNLOCKS_FILE);
};

export const getProfileUnlocksByCompanyId = (companyId: string): ProfileUnlock[] => {
  const unlocks = getProfileUnlocks();
  return unlocks.filter(unlock => unlock.companyId === companyId);
};

export const hasCompanyUnlockedInfluencer = (companyId: string, influencerId: string): boolean => {
  const unlocks = getProfileUnlocks();
  return unlocks.some(unlock => unlock.companyId === companyId && unlock.influencerId === influencerId);
};

export const createProfileUnlock = (unlockData: Omit<ProfileUnlock, 'id' | 'unlockDate'>): ProfileUnlock => {
  const unlocks = getProfileUnlocks();
  
  const newUnlock: ProfileUnlock = {
    id: uuidv4(),
    ...unlockData,
    unlockDate: new Date().toISOString(),
  };
  
  unlocks.push(newUnlock);
  writeData(PROFILE_UNLOCKS_FILE, unlocks);
  
  return newUnlock;
};

// Get full influencer data with user and social accounts
export const getFullInfluencerData = (influencerId: string, isAnonymized = false) => {
  const profile = getInfluencerProfileById(influencerId);
  
  if (!profile) {
    return null;
  }
  
  const user = getUserById(profile.userId);
  const socialAccounts = getSocialAccountsByInfluencerId(influencerId);
  
  if (isAnonymized) {
    // Return anonymized data
    return {
      id: profile.id,
      categories: profile.categories,
      location: profile.location,
      priceRange: profile.priceRange,
      socialAccounts: socialAccounts.map(account => ({
        platform: account.platform,
        followers: account.followers,
        engagement: account.engagement,
      })),
    };
  }
  
  // Return full data
  return {
    ...profile,
    user: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    },
    socialAccounts,
  };
};

// Get full company data with user
export const getFullCompanyData = (companyId: string) => {
  const profile = getCompanyProfileById(companyId);
  
  if (!profile) {
    return null;
  }
  
  const user = getUserById(profile.userId);
  
  return {
    ...profile,
    user: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    },
  };
};

// Initialize with sample data if needed
export const initializeSampleData = () => {
  const users = getUsers();
  
  // Only initialize if no data exists
  if (users.length === 0) {
    console.log('Initializing sample data...');
    
    // Create sample data here if needed
    // This would be a good place to add demo users, profiles, etc.
  }
};

// Call initialization
initializeSampleData();
