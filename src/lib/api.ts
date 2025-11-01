// API service for AdCampaigns backend integration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

export interface AdCampaignRegisterRequest {
  name: string;
  email: string;
  source: string;
  referrerId?: string | null;
  how_soon?: string | null;
  schooling_mode?: string | null;
  landing_variant?: string | null;
  recaptchaToken: string | null;
}

export interface AdCampaignRegisterResponse {
  success?: boolean;
  id?: string;
  email?: string;
  user_id?: string;
  account_created?: boolean;
  message?: string;
  error?: string;
  duplicate?: boolean;
  error_type?: string;
}

export const adCampaignService = {
  async register(data: AdCampaignRegisterRequest): Promise<AdCampaignRegisterResponse> {
    try {
      // Explicitly construct payload without any UTM parameters
      const payload = {
        name: data.name,
        email: data.email,
        source: data.source,
        referrerId: data.referrerId ?? null,
        how_soon: data.how_soon ?? null,
        schooling_mode: data.schooling_mode ?? null,
        landing_variant: data.landing_variant ?? null,
        recaptchaToken: data.recaptchaToken,
      };

      console.log('API Request URL:', `${API_BASE_URL}/ad-campaigns/register`);
      console.log('API Request Payload:', payload);

      const response = await fetch(`${API_BASE_URL}/ad-campaigns/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Website-Base-URL': window.location.origin,
          'Allow-Analytics-Tracking': 'true',
        },
        body: JSON.stringify(payload),
      });

      console.log('API Response Status:', response.status, response.statusText);

      let result;
      try {
        result = await response.json();
        console.log('API Response Data:', result);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response from server. Please try again.');
      }

      // Handle 400 Bad Request errors explicitly
      if (!response.ok && response.status === 400) {
        const responseData = result.response || result;
        const errorMessage = responseData.error || 'Bad request. Please check your input.';
        const error = new Error(errorMessage) as any;
        error.errorType = responseData.error_type || 'validation_error';
        error.status = response.status;
        error.error_codes = responseData.error_codes;
        throw error;
      }

      // Handle network errors
      if (!response.ok && response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }

      // Handle response format: { response: {...}, placements: [...] }
      const responseData = result.response || result;

      // Check for errors in response
      if (responseData.error) {
        const errorMessage = responseData.error || 'Registration failed';
        const error = new Error(errorMessage) as any;
        error.errorType = responseData.error_type || 'unknown';
        error.status = response.status;
        throw error;
      }

      // Handle duplicate email - throw error so frontend can handle it
      if (responseData.duplicate || responseData.message === 'Email already registered') {
        const error = new Error('Email already registered') as any;
        error.errorType = 'duplicate_email';
        error.duplicate = true;
        throw error;
      }

      // Success response
      if (responseData.success !== false) {
        return responseData;
      }

      // Fallback error
      throw new Error(responseData.error || 'Registration failed');
    } catch (error: any) {
      // Re-throw if it's already an Error with message
      if (error instanceof Error) {
        throw error;
      }
      // Handle network errors
      if (error.name === 'TypeError' || error.message?.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw new Error(error.message || 'An unexpected error occurred. Please try again.');
    }
  },
};

