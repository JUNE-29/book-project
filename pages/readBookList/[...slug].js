import { useRouter } from 'next/router';

export default function FilteredReadBookList() {
    const router = useRouter();
    const filterData = router.query.slug;

    console.log(filterData);
    return;
}
