import { NextResponse } from 'next/server';
import { ApiKeyService } from '@/components/admin/chatbot-management/ApiKeyService';

// API URLs for different providers
const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

// API handler để test kết nối tới OpenAI
export async function GET() {
  try {
    // Lấy OPENAI_API_KEY từ env
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    console.log('Using API key from ENV:', OPENAI_API_KEY ? 'Yes (length: ' + OPENAI_API_KEY.length + ')' : 'No');

    // Prepare response results
    const results = [];

    // TEST 1: Thử với API key từ ENV
    if (OPENAI_API_KEY) {
      try {
        console.log('TEST 1: Using API key from ENV');
        const systemPrompt = "You are a helpful assistant.";
        const userPrompt = "Say hello in one word.";
        
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 50,
            stream: false
          })
        });
      
        // Log the entire response for debugging
        const responseText = await response.text();
        console.log('OpenAI API Response Status:', response.status);
        console.log('OpenAI API Response Headers:', Object.fromEntries([...response.headers.entries()]));
        
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
      const apiKeyData = await ApiKeyService.getActiveApiKey('openai');
      
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
            max_tokens: 50,
            stream: false
          })
        });
      
        // Log the entire response for debugging
        const responseText = await response.text();
        console.log('OpenAI API Response Status (DB key):', response.status);
        console.log('OpenAI API Response Headers (DB key):', Object.fromEntries([...response.headers.entries()]));
        
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
          error: 'No API key found in database for OpenAI'
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