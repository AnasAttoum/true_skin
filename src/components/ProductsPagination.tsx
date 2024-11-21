import { Pagination, Stack } from "@mui/material";
import { product } from "../constants/types";

export default function ProductsPagination({
  products,
  page,
  setPage,
}: {
  products: product[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-center py-10">
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(products.length / 20)}
          page={page}
          onChange={(_e, value) => {
            setPage(value);
          }}
          color="primary"
        />
      </Stack>
    </div>
  );
}
