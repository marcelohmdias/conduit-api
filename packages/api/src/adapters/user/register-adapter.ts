import { OutsideRegister, register as registerPort } from '@core/use-cases/user/register-user'

export const register = (outsideRegister: OutsideRegister) => registerPort(outsideRegister)
