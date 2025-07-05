import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(req.ip);
    
    if (!success) {
      return res.status(429).json({ 
        message: "Too many requests", 
        retryAfter: Math.round((reset - Date.now()) / 1000) 
      });
    }
    
    // Add rate limit info to response headers
    res.set({
      'X-RateLimit-Limit': limit,
      'X-RateLimit-Remaining': remaining,
      'X-RateLimit-Reset': new Date(reset).toISOString()
    });
    
    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    next(); // Continue without rate limiting if there's an error
  }
};

export default rateLimiter;