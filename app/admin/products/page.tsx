import EmptyList from "@/components/global/EmptyList";
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";

import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

async function AdminProductsPage() {
  const items = await fetchAdminProducts();
  if (items.length === 0) return <EmptyList />;

  return (
    <section className="bg-pink-50 p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-pink-800 mb-4">Admin Products</h1>
      <Table className="border border-pink-200 rounded-md overflow-hidden shadow-md">
        <TableCaption className="capitalize text-pink-600">
          total products : {items.length}
        </TableCaption>
        <TableHeader className="bg-pink-100 text-pink-800">
          <TableRow>
            <TableHead className="text-pink-700">Product Name</TableHead>
            <TableHead className="text-pink-700">Company</TableHead>
            <TableHead className="text-pink-700">Price</TableHead>
            <TableHead className="text-pink-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, name, company, price } = item;
            return (
              <TableRow
                key={productId}
                className="hover:bg-pink-100 transition-colors duration-200"
              >
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className="underline text-pink-600 hover:text-pink-800 transition"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell className="text-pink-700">{company}</TableCell>
                <TableCell className="text-pink-700">
                  {formatCurrency(price)}
                </TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/products/${productId}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

function DeleteProduct({ productId }: { productId: string }) {
  const deleteProduct = deleteProductAction.bind(null, { productId });
  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default AdminProductsPage;
