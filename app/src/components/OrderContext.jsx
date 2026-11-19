import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { NEEDS } from '../i18n/texts';

// So‘rov formasi maydonlari. Boshqa bo‘limlar ham ularni to‘ldiradi:
// «Narxini so‘rash» tugmalari — «Nima kerak?», kalkulyator — hajm va izoh.
export const EMPTY_ORDER = { name: '', phone: '', company: '', need: NEEDS[0].value, volume: '', note: '', website: '' };

const FieldsContext = createContext(null);
const ActionsContext = createContext(null);

// need — «Nima kerak?» ning boshlang‘ich tanlovi: alohida sahifalarda shu sahifa mavzusi
// (masalan, «Makulatura» sahifasida — «Makulatura topshirish»); berilmasa — ro‘yxatdagi birinchisi.
export function OrderProvider({ need, children }) {
  const empty = useMemo(() => (need ? { ...EMPTY_ORDER, need } : EMPTY_ORDER), [need]);
  const [fields, setFields] = useState(empty);
  const actions = useMemo(() => ({
    setFields,
    // prefill({ need, volume, note }) — berilgan maydonlarni almashtiradi, qolganlari o‘zgarmaydi
    prefill: patch => setFields(f => ({ ...f, ...patch })),
    reset: () => setFields(empty),
  }), [empty]);
  return (
    <ActionsContext.Provider value={actions}>
      <FieldsContext.Provider value={fields}>{children}</FieldsContext.Provider>
    </ActionsContext.Provider>
  );
}

// maydon qiymatlari (faqat formaning o‘zi uchun)
export const useOrderFields = () => useContext(FieldsContext);
// { prefill, reset, setFields } — o‘zgarmaydi, shuning uchun tugmalar har harfda qayta chizilmaydi
export const useOrderActions = () => useContext(ActionsContext);

// "Nima kerak?" tanlovini o‘rnatuvchi onClick (havola #aloqa ga o‘zi aylantiradi)
export function usePickNeed() {
  const { prefill } = useOrderActions();
  return useCallback(need => () => prefill({ need }), [prefill]);
}
