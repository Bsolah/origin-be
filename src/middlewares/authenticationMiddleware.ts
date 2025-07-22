import * as jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';

export const authenticateUser: any = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    } else {
      // Return early if no token is provided

      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing or invalid',
      });
    }
  } else {
    token = header.split(' ')[1];
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as any;
    req.user = decodedToken; // Attach decoded token to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err: any) {
    // Inline function to handle errors and clear cookies
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token',
    });
  }
};
