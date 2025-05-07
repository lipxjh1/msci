import { NextResponse } from 'next/server';
import { ApiKeyService } from '@/components/admin/chatbot-management/ApiKeyService';

// API URLs for different providers
const API_URL = 'https://api.mistral.ai/v1/chat/completions';
const MODEL = 'mistral-tiny';

// API handler để test kết nối tới Mistral
export async function GET() {
  try {
    // Lấy MISTRAL_API_KEY từ env
    const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
    console.log('Using API key from ENV:', MISTRAL_API_KEY ? 'Yes (length: ' + MISTRAL_API_KEY.length + ')' : 'No');

    // Prepare response results
    const results = [];

    // TEST 1: Thử với API key từ ENV
    if (MISTRAL_API_KEY) {
      try {
        console.log('TEST 1: Using API key from ENV');
        const systemPrompt = "You are a helpful assistant.";
        const userPrompt = "Say hello in one word.";
        
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MISTRAL_API_KEY}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 50
          })
        });
      
        // Log the entire response for debugging
        const responseText = await response.text();
        console.log('Mistral API Response Status:', response.status);
        console.log('Mistral API Response Headers:', Object.fromEntries([...response.headers.entries()]));
        
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { text: responseText };
        }
        
        results.push({
          source: 'ENV API Key',
          success: response.ok,
          status: response.status,
          data: responseData
        });
      } catch (envApiError) {
        console.error('Error testing ENV API key:', envApiError);
        results.push({
          source: 'ENV API Key',
          success: false,
          error: envApiError instanceof Error ? envApiError.message : String(envApiError)
        });
      }
    }

    // TEST 2: Thử với API key từ database
    try {
      console.log('TEST 2: Using API key from database');
      // Lấy API key từ database
      const apiKeyData = await ApiKeyService.getActiveApiKey('mistral');
      
      if (apiKeyData) {
        console.log('Found API key in database:', apiKeyData.id);
        
        const systemPrompt = "You are a helpful assistant.";
        const userPrompt = "Say hello in one word.";
        
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKeyData.key}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 50
          })
        });
      
        // Log the entire response for debugging
        const responseText = await response.text();
        console.log('Mistral API Response Status (DB key):', response.status);
        console.log('Mistral API Response Headers (DB key):', Object.fromEntries([...response.headers.entries()]));
        
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { text: responseText };
        }
        
        results.push({
          source: 'Database API Key',
          success: response.ok,
          status: response.status,
          key_id: apiKeyData.id,
          data: responseData
        });
      } else {
        results.push({
          source: 'Database API Key',
          success: false,
          error: 'No API key found in database for Mistral'
        });
      }
    } catch (dbApiError) {
      console.error('Error testing database API key:', dbApiError);
      results.push({
        source: 'Database API Key',
        success: false,
        error: dbApiError instanceof Error ? dbApiError.message : String(dbApiError)
      });
    }

    return NextResponse.json({ 
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('General error in test API:', error);
    return NextResponse.json(
      { 
        error: 'Error in test API', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 