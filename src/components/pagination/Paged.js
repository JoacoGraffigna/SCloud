import {  Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';

export default function Paged({data}) {

  const { setShowList } = useContext(AppContext);

  const [page, setPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(3);

  const [pageNumberLimit, setPageNumberLimit] = useState(1);

  
  useEffect(() => {

    if(data.length){

      if( data.length <= itemsPerPage ){
        setPage(1)
      }
  
        const newPageNumberLimit = Math.ceil(data?.length / itemsPerPage);
        
        if(page > newPageNumberLimit){
          setPage(newPageNumberLimit)
        }
  
        setPageNumberLimit(newPageNumberLimit);
      
        const newIndexOfLastItem = page * itemsPerPage;
        const newIndexOfFirstItem = newIndexOfLastItem - itemsPerPage;
      
        setShowList(data.slice(newIndexOfFirstItem, newIndexOfLastItem));

    }else{
      setShowList([])
    }
  
  }, [data, page, itemsPerPage]);

  const handleChange = (event, value) => {
    event.preventDefault()
    setPage(value);
    const newIndexOfLastItem = value * itemsPerPage;
    const newIndexOfFirstItem = newIndexOfLastItem - itemsPerPage;
    const result = data.slice(newIndexOfFirstItem, newIndexOfLastItem);
    setShowList(result);
  };



  return (
    <Stack  spacing={2} display={data.length <= itemsPerPage && 'none'} >
      <Pagination size='small' count={pageNumberLimit} page={page} onChange={handleChange} />
    </Stack>
    
  )
}
