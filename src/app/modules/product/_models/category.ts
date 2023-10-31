export class Category {
    // Atributos de la clase
    public category_id: number;
    public code: string;
    public category: string;
    public status: number;

    //Constructor de la clase
    constructor(category_id:number, code:string, category:string, status:number) {
        this.category_id = category_id;
        this.code = code;
        this.category = category;
        this.status = status;
    }
}