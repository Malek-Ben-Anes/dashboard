export class PageRequest {
    public constructor(
        public request: PagePaginationRequest
    ) { }

    toGetParams() {
        return {
            request: this.request.toGetParams()
        };
    }
}

/**
 * Create a page request
 */
export class PagePaginationRequest {

    public static fromDefault(): PagePaginationRequest {
        return new PagePaginationRequest(
            '',
            'updated',
            '',
            0,
            10,
            []
        );
    }
    /**
     * Create a page request from primefaceng datatable request
     * @param $event from primeface
     * @param nbElements Nb of element in the page
     */
    public static fromPrimeFaceEvent($event, nbElements = 10): PagePaginationRequest {
        let orderDirection = 'ASC';
        if (parseInt($event.sortOrder, 10) === -1) {
            orderDirection = 'DESC';
        }

        return new PagePaginationRequest(
            $event.globalFilter,
            $event.sortField,
            orderDirection,
            Math.floor($event.first / nbElements),
            nbElements,
            PageRequestColumn.fromPrimeFilter($event.filters)
        );
    }

    protected constructor(
        public keyword: string,
        public orderBy: string,
        public orderDirection: string,
        public page: number,
        public nbRows: number,
        public pageRequestColumn: PageRequestColumn[] = []
    ) {

    }
    toGetParams() {
        if (this.keyword == null) {
            this.keyword = '';
        }
        const object = Object.assign({
        }, this);
        delete object.pageRequestColumn;
        // Linearisation of PageRequestColumn to get[]
        for (const pageRequestColumn of this.pageRequestColumn) {
            for (const index in pageRequestColumn) {
                if (pageRequestColumn.hasOwnProperty(index)) {
                    if (!object[index]) {
                        object[index] = [];
                    }
                    object[index].push(pageRequestColumn[index]);
                }
            }
        }
        return object;
    }
}

export class PageRequestColumn {
    /**
     * Create a pageRequestFilter from a primeface filter
     * @param filters
     */
    public static fromPrimeFilter(filters): PageRequestColumn[] {
        if (!filters) {
            return [];
        }
        const result: PageRequestColumn[] = [];
        for (const index in filters) {
            if (filters.hasOwnProperty(index)) {
                result.push(new PageRequestColumn(index, filters[index].value));
            }
        }
        return result;
    }
    protected constructor(
        public column: string,
        public columnKeyword: string
    ) {

    }

}
