export interface TArticle {
    title: string;
    introduction: string;
    proTip: string;
    conclusion: string;
    published: boolean;
    image: string;
    categoryId: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
