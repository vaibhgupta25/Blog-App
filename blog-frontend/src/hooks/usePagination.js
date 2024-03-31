import { useMemo } from 'react'

export const DOTS = "...";

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
    totalPageCount,
}) => {
    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount + 5;

        // number of pages is less than the pageNumber
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }
        // calculating the left and the right sibling index
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        // caculating whether we want to show left / right / both dots
        // or we don't show dots just when there is just one page number to be 
        // between the sibling and the page limit

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < (totalPageCount - 2);

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // showing only right dots
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(1, leftItemCount)
            return [...leftRange, DOTS, totalPageCount]
        }

        // showing only left dots
        if (!shouldShowRightDots && shouldShowLeftDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, DOTS, ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, middleRange, DOTS, lastPageIndex]
        }

    }, [
        siblingCount, currentPage, totalPageCount
    ])
    return paginationRange
}

function range(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (value, index) => {
        return index + start;
    })
}
