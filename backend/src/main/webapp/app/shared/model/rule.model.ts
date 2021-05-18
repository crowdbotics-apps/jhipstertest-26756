import dayjs from 'dayjs';

export interface IRule {
  id?: number;
  name?: string | null;
  clientTariffNumber?: string | null;
  ruleNumber?: string | null;
  status?: string | null;
  publisherName?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  effectiveDate?: string | null;
  expirationDate?: string | null;
  fileDate?: string | null;
  fileAmendType?: string | null;
  formula?: string | null;
  parentRule?: number | null;
  ruleText?: string | null;
}

export const defaultValue: Readonly<IRule> = {};
