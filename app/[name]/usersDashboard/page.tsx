'use client';
import { useState, useMemo, useEffect } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_FilterFn,
    type MRT_Row
} from 'material-react-table';
import { UsersTable } from '@/types/dashboards/UsersTable';


type ColumnFilter = {
    id: string;
    value: string | boolean;
};

const UsersTableComponent = () => {
    const [data, setData] = useState<UsersTable[]>([]);
    


    useEffect(() => {
        setData([
            {
                userName: 'john_doe',
                isActive: true,
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                role: 0,
                userStores: ['Store 1', 'Store 2'],
                userId: 'hffhfh',
            },
            {
                userName: 'jane_smith',
                isActive: false,
                email: 'jane.smith@example.com',
                phone: '234-567-8901',
                role: 10,
                userStores: ['Store 3'],
                userId: 'hffhfh',
            },
            {
                userName: 'alice_jones',
                isActive: true,
                email: 'alice.jones@example.com',
                phone: '345-678-9012',
                role: 50,
                userStores: ['Store 1'],
                userId: 'hffhfh',
            },
            {
                userName: 'bob_brown',
                isActive: true,
                email: 'bob.brown@example.com',
                phone: '456-789-0123',
                role: 100,
                userStores: ['Store 2', 'Store 3'],
                userId: 'hffhfh',
            },
            {
                userName: 'charlie_williams',
                isActive: false,
                email: 'charlie.williams@example.com',
                phone: '567-890-1234',
                role: 20,
                userStores: ['Store 4'],
                userId: 'hffhfh',
            },
        ]);
    }, []);

    const columns = useMemo<MRT_ColumnDef<UsersTable>[]>(
        () => [
            {
                accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'),
                accessorKey: 'isActive',
                header: 'Status',
                id: 'isActive',
                filterVariant: 'checkbox',
                Cell: ({cell}) => {
                    return cell.getValue() === 'true' ? 'Active' : 'Deleted'; 
                }
            },
            {
                accessorKey: 'userName',
                header: 'User Name',
            },
            
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
            },
            {
                accessorKey: 'role',
                header: 'Role',

            },
            {
                accessorKey: 'userStores',
                header: 'Stores',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnFilters: true,
        enableStickyHeader: true,
        columnFilterDisplayMode: 'popover',
        initialState: {
            pagination: { pageSize: 10, pageIndex: 0 },
            columnVisibility : {'isActive' : false},
            columnFilters : [
                {
                    id: 'isActive',
                    value: true,
                }
            ]
        },
        muiPaginationProps: {
            rowsPerPageOptions: [10, 50, 100],
        },
        
    });

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
};

export default UsersTableComponent;