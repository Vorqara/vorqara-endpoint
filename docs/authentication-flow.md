# Authentication Flow

1. User registers.
2. Password is hashed using bcrypt.
3. User record is stored.
4. User logs in.
5. Password is verified.
6. JWT Access Token is generated.
7. Client stores token.
8. Client sends Authorization header:

Bearer <token>

9. JWT Guard validates token.
10. Request proceeds to protected endpoint.