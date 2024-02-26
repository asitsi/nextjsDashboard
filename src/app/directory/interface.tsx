export interface Item {
    lable: string;
    path: string;
    icon: string;
  }
  
export interface FormData {
    id?: number;
    donor: string;
    panels: string;
    barcode: string;
    source: string;
    date: string;
    amount: string;
    observedBy: string;
    status: string;
  }

export interface MultiInputFormProps {
    onSubmit: (formData: FormData) => void;
    updatedData: any;
}

export interface Event {
    id: string;
    title: string;
    type: 'event' | 'reminder';
    date: number;
  }

export interface CalendarProps {}