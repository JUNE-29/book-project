import { useRouter } from 'next/router';
import styles from './book_counting.module.css';
import { useState } from 'react';

export default function BookCounting({ books, filteredYear }) {
    const [selectedOption, setselectedOption] = useState('모두보기');
    const router = useRouter();

    const selectOption = (event) => {
        const selectedYear = event.target.value;
        setselectedOption(selectedYear);
        if (selectedYear === '모두보기') {
            router.push(`/readBookList`);
        } else {
            router.push(`/readBookList/${selectedYear}`);
        }
    };

    const getFilterdYear = () => {
        if (filteredYear) {
            return (
                <select value={selectedOption} onChange={selectOption}>
                    <option vlaue='all' key='all'>
                        모두보기
                    </option>
                    {filteredYear.map((year) => {
                        return (
                            <option value={year} key={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
            );
        }
    };

    const counting = () => {
        if (
            router.pathname === '/readBookList' ||
            router.pathname.includes('/readBookList')
        ) {
            return <span>총 읽은 책 : {books.length}권</span>;
        } else if (router.pathname === '/wishBookList') {
            return <span>총 읽고 싶은 책 : {books.length}권</span>;
        }
    };

    return (
        <div className={styles.counting}>
            {getFilterdYear()}
            {counting()}
        </div>
    );
}
