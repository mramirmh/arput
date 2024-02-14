'use client'

import { Grid } from "@mui/material";
import AdminCard from "../module/AdminCard";
import { Chart } from "../module/Chart";
import { Bars } from "../module/Bars";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardMainPage = () => {

    const route = useRouter()

    useEffect(() =>{
        setTimeout(() => {
            route.refresh()
        }, 200);
    },[])


    return (
        <div className="w-full gap-8 flex flex-col h-full" >
            <Grid className='w-full flex flex-row justify-between items-center gap-6' >
                <div className='md:w-1/5 w-full' >
                    <AdminCard/>
                </div>
                <div className='w-1/5 md:block hidden ' >
                    <AdminCard/>
                </div>
                <div className='w-1/5 md:block hidden ' >
                    <AdminCard/>
                </div>
                <div className='w-1/5 md:block hidden' >
                    <AdminCard/>
                </div>
            </Grid>

                <Grid className='w-full flex md:flex-row flex-col justify-center items-center gap-12' >
                    <Grid className='md:w-3/5 w-full shadow-xl' >
                    <Chart/>
                    </Grid>
                    <Grid className='md:w-2/5 w-full shadow-xl' >
                    <Bars/>
                    </Grid>
                </Grid>
                <Grid className='w-full border-2 text-center shadow-xl' >
                    table
                </Grid>
        </div>
    );
}

export default DashboardMainPage;