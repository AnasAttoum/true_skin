import { Paper } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Title from "../../components/Title";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import HelmetDetails from "../../components/HelmetDetails";

export default function Products() {

  const { ref, inView, entry } = useInView();
  const products = useSelector((state: RootState) => state.product);

  const [paginationModel, setPaginationModel] = useState<{ page: number, pageSize: number }>({ page: 0, pageSize: 10 })


  useEffect(() => {
    if (entry)
      (
        entry.target as HTMLElement
      ).style.animation = `opacityAnimation .7s .3s forwards`;
  }, [inView, entry]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "image", headerName: "Image", width: 75,
      renderCell: (params) => {
        return (
            <img src={params.value} alt="Product" className="object-contain h-full w-full" />
        );
      }
     },
    { field: "price", headerName: "Price ($)", width: 75 },
    { field: "stock", headerName: "Stock", width: 75 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "description", headerName: "Description", width: 500 },
  ];

  const handleChangePage = (e: { page: number }) => {
    setPaginationModel((prev) => ({ ...prev, page: e.page }));
  };


  return (
    <div style={{ minHeight: "calc(100vh - 100px)" }}>
      <HelmetDetails
        title="Dashboard"
        href="/dashboard"
        description="True Skin dashboard"
      />
      <Title title="True Skin Products" />

      <div className="flex justify-center py-5">
        <Paper
          sx={{
            width: "fit-content",
            overflowX: "scroll",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <div
            className="px-5 py-2"
            style={{ display: "flex", flexDirection: "column", opacity: "0" }}
            ref={ref}
          >
            <DataGrid
              rows={products.slice(paginationModel.page * 10, 10 + paginationModel.page * 10)}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10]}
              rowCount={products.length}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={handleChangePage}
              // checkboxSelection
              sx={{ border: 0 }}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
}