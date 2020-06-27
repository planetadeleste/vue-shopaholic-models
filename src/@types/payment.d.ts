export interface PaymentMethodItem {
  id: number;
  name: string;
  code: string;
  preview_text?: string;
  restriction?: any[];
}
