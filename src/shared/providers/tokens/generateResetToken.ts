import crypto from "crypto";

const generateResetToken = () => {
  return crypto.randomUUID();
};

export { generateResetToken };
