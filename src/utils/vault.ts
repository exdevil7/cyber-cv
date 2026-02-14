/**
 * Simple obfuscation vault for personal data in the repository.
 * This is NOT military-grade encryption, but it prevents automated scrapers 
 * and simple string searches from finding your personal details in the source code.
 */

// Simple XOR/Shift key for obfuscation (aesthetic only)
const VAULT_KEY = 0x42;

export const vault = {
    /**
     * Encodes a string for storage in the code.
     */
    encode: (text: string): string => {
        const encoded = btoa(
            text.split('')
                .map(char => String.fromCharCode(char.charCodeAt(0) ^ VAULT_KEY))
                .join('')
        );
        return `VAULT_v1<${encoded}>`;
    },

    /**
     * Decodes a vault-encoded string for the UI.
     */
    decode: (payload: string): string => {
        if (!payload.startsWith('VAULT_v1<') || !payload.endsWith('>')) {
            return payload; // Not an encoded string
        }

        try {
            const base64 = payload.substring(9, payload.length - 1);
            const decoded = atob(base64);
            return decoded.split('')
                .map(char => String.fromCharCode(char.charCodeAt(0) ^ VAULT_KEY))
                .join('');
        } catch (e) {
            console.error('Failed to decrypt vault data');
            return '[DATA_CORRUPTED]';
        }
    }
};
