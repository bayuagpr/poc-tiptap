export interface Variable {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date';
  label: string;
  value: string;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  variables: Variable[];
}