import React,{forwardRef,useState, useRef} from "react";
import MaterialTable from "material-table";

import onError, { QUERYING } from "../services/errorsHandler";
import { GET_USERS } from "../services/apollo/queries";
import { useQuery } from "@apollo/client";
import { isAdmin } from "../services/apollo/cache";
import { Redirect } from "react-router";
import loader from "../images/loader.gif";

import '../../public/assets/styles/style.min.css';
import '../../public/assets/styles/custom.css';
import '../../public/assets/plugin/waves/waves.min.css';
import '../../public/assets/plugin/datatables/media/css/dataTables.bootstrap4.min.css';
import '../../public/assets/plugin/datatables/extensions/Responsive/css/responsive.bootstrap.min.css';


const tableIcons = {
    

  };

const tableColumnConfig= [
    {
        title:'First name',
        field:'firstName'
    },
    {
      title:'Last name',
      field:'lastName'
    },
    {
      title:'User name',
      field:'userName'
  },
    {
        title:'Email',
        field:'email'
    },
    {
        title:'Age',
        field:'age'
    },
    {
        title:'Role',
        field:'role'
    },

]


const Table = () => {
    const tableRef = useRef(null);

  if (!isAdmin()) return <Redirect to="/not-found" />;

  const { loading, error, data } = useQuery(GET_USERS, {
    onError: () => onError(QUERYING),
  });

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  const {users} = data
  
  
  const editable =users.map((user) => user)
  console.log(editable)
  const result=JSON.parse(JSON.stringify(editable));
  //console.log(tableColumnConfig)
  //console.log(result)
  
  return (
    <div id="wrapper">
	    <div className="mt-5 pt-5 ml-5 pl-5 mr-5 pr-5">
		    <div className="row small-spacing"  style={{marginTop: "7%"}}>
			    <div className="col-12">
				    <div className="box-content">
					    <h4 className="box-title">Consult Users</h4>
                        <MaterialTable
                                    className="table table-striped table-bordered display"
                                    tableRef={tableRef}
                                    icons={tableIcons}
                                    columns={tableColumnConfig}
                                    data={result}
                                    title="Users Table" />
                </div>
          </div>

        </div>
      </div>
    </div>
    
  );
};


export default Table;