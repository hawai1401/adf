import { createAuthClient } from "better-auth/client";
import { apiKeyClient } from "better-auth/client/plugins";

const authClient = createAuthClient({ plugins: [apiKeyClient()] });

export default authClient;
