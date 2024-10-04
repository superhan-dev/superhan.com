export interface CRUDInterface {
  create?(dto: any): Promise<any>;
  read?(params: any): Promise<any>;
  update?(id: any, dto: any): Promise<any>;
  delete?(id: any): Promise<any>;
}
