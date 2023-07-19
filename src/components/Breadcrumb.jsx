import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ route }) => {
    return (
        <div className="row mb-2">
            <div className="col-sm-6">
              
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">{route}</li>
                </ol>
            </div>
        </div>
    );
};

export default Breadcrumb;