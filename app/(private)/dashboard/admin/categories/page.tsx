import CategorieManagment from "../_components/categorie-managment";
import { initialCategories } from "../_lib/shemaCategorie";

export default function CategoriesPage() {
  return <CategorieManagment initialCategories={initialCategories} />;
}
