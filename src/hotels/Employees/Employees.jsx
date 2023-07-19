import { Card, CardBody, Form, Table } from "reactstrap";
import Breadcrumb from "../../components/Breadcrumb";

const employees = [
    {
        name: "Hanna Gover",
        email: "hgover@gmail.com",
        hotel: "Hotel A",
        address: "Dhaka",


    },
    {
        name: "Hanna Gover",
        email: "hgover@gmail.com",
        hotel: "Hotel B",
        address: "Mirpur",


    },
    {
        name: "Hanna Gover",
        email: "hgover@gmail.com",
        hotel: "Hotel C",
        address: "Dhaka",


    },
    {
        name: "Hanna Gover",
        email: "hgover@gmail.com",
        hotel: "Hotel D",
        address: "Lalbag",


    },
    {
        name: "Hanna Gover",
        email: "hgover@gmail.com",
        hotel: "Hotel E",
        address: "Banani",


    },
];

const Employees = () => {
    return (
        <div className='content-wrapper'>
            <div className="content-header">
                <Breadcrumb route={'Employee'} />
                {/* Search bar */}
                <div className="col-sm-6 col-md-4">
                    <div class="d-flex border border-3 px-2 py-2 rounded-5 mb-2">
                        <button type="submit" class="border-0">
                            <i class="fa fa-search"></i>
                        </button>
                        <input type="text" class="border-0 w-100 Search-input" placeholder="Search hotel, employees" />
                    </div>
                </div>


                <Card>
                    <CardBody>

                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Employees </th>
                                    <th>Hotel Name</th>
                                    <th>Address</th>

                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>
                                            <div className="d-flex align-items-center p-2">

                                                <div className="ms-3">
                                                    <h6 className="mb-0">{tdata.name}</h6>
                                                    <span className="text-muted">{tdata.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{tdata.hotel}</td>
                                        <td>
                                            {tdata.address}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>

        </div>
    );
};

export default Employees;
