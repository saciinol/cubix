import { create } from 'zustand';
import { getMyProfile, getProfile, updateProfile } from '../services/profileService';

const useProfileStore = create((set, get) => ({
	// state
	profile: [],
	isLoading: false,
	isSubmitting: false,

  
}));

export default useProfileStore;