// `npm run build` oldidan ishlaydi: repo ildizidagi eski build fayllarini (../static) o‘chiradi,
// aks holda har buildda yangi hashli JS/CSS qo‘shilib, eskilari yig‘ilib qoladi.
// Faqat ../static o‘chiriladi — boshqa hech narsaga tegilmaydi.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../../static', import.meta.url));
if (fs.existsSync(dir)) {
  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`o‘chirildi: ${dir}`);
}
