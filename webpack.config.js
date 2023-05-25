import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default 
{
    "entry":["./static/src/script.js"],
    "watch": true,
    "output": {
        "filename": "bundle.js",
        "path": path.resolve(__dirname, 'static/dist'),
        "library": "MC"
    }
}