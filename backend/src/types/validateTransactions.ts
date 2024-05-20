export interface ValidateSuccess {
  documentId: string;
  description: string;
  amount: number;
  telephone: string;
  email: string;
  isReceiveCash: boolean;
  bonusScheduledDate?: string;
  externalIdentifier?: string;
}

export interface ValidateErros {
  row: number;
  message: string;
}

export interface DatasetTransaction {
  documentId: string;
  description: string;
  amount: string;
  telephone: string;
  email: string;
  isReceiveCash: string;
  bonusScheduledDate?: string;
  externalIdentifier?: string;
}
