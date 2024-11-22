import { Paper } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Title from "../../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import HelmetDetails from "../../components/HelmetDetails";
import { Link } from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog";
import { deleteProduct } from "../../lib/slices/productSlice";
import FloatingButton from "../../components/FloatingButton";

export default function Products() {

  const { ref, inView, entry } = useInView();
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.product);

  const [paginationModel, setPaginationModel] = useState<{ page: number, pageSize: number }>({ page: 0, pageSize: 10 })


  useEffect(() => {
    if (entry)
      (
        entry.target as HTMLElement
      ).style.animation = `opacityAnimation .7s .3s forwards`;
  }, [inView, entry]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "image", headerName: "Image", width: 120,
      renderCell: (params) => {
        return (
            <img src={params.value} alt="Product" className="object-contain h-full w-full" />
        );
      }
     },
    { field: "price", headerName: "Price ($)", width: 130 },
    { field: "stock", headerName: "Stock", width: 110 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "description", headerName: "Description", width: 500 },
    {
      field: 'actions', headerName: 'Actions', width: 130,
      renderCell: (params) => {
          return (
              <div className='flex items-center gap-5 mt-3'>
                  <Link to={`/dashboard/${params.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="var(--primary)" fillRule="evenodd" d="M14 4.182A4.14 4.14 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4 4 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71l1.287-1.31l.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141l5.063-5.218zm-6.25 6.886l-1.98 5.849a.99.99 0 0 0 .245 1.026a1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01l5.096-5.186l-2.218-2.183l-5.063 5.218l2.185 2.15Z" clipRule="evenodd"></path></svg></Link>
                  <span className='cursor-pointer' onClick={(e) => { handleOpenDeleteModal(params); e.stopPropagation(); }}><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#d32f2f" d="M11 3h5v1H0V3h5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zm-7.056 8H7v1H4.1l.392 2.519c.042.269.254.458.493.458h6.03c.239 0 .451-.189.493-.458l1.498-9.576H14l-1.504 9.73c-.116.747-.74 1.304-1.481 1.304h-6.03c-.741 0-1.365-.557-1.481-1.304l-1.511-9.73H9V5.95H3.157L3.476 8H8v1H3.632zM6 3h4V1H6z"></path></svg></span>
              </div>
          );
      }
        },
  ];

  const handleChangePage = (e: { page: number }) => {
    setPaginationModel((prev) => ({ ...prev, page: e.page }));
  };

  const id = useRef<number>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = (params: any) => { setOpenDeleteModal(true); id.current = params.id }
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleDelete = () => {
      if(id.current)
        dispatch(deleteProduct(id.current))
      handleCloseDeleteModal()
    }


  return (
    <>
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

    <DeleteDialog open={openDeleteModal} handleClose={handleCloseDeleteModal} handleAgree={handleDelete}  text="Are you sure you want to delete tis product?" />
    <FloatingButton url='/dashboard/add' tooltip='Add Product' />
    </>
  );
}