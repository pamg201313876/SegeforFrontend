import React from 'react'
import { Pagination as SemanticPagination, Icon, PaginationProps as SemanticPaginationProps } from 'semantic-ui-react'

export type CustomPaginationProps = {
	activePage: number 
	totalPages: number
	handlePageChange: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: SemanticPaginationProps) => void
}

export default function CustomPagination(props: CustomPaginationProps) {
	return (
			<SemanticPagination 
				activePage={props.activePage}
				onPageChange={props.handlePageChange}
				ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
				firstItem={{ content: <Icon name='angle double left' />, icon: true }}
				lastItem={{ content: <Icon name='angle double right' />, icon: true }}
				prevItem={{ content: <Icon name='angle left' />, icon: true }}
				nextItem={{ content: <Icon name='angle right' />, icon: true }} 
				totalPages={props.totalPages} />
	)
}
