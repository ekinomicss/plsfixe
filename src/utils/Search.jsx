import algoliasearch from 'algoliasearch/lite';
import "instantsearch.css/themes/satellite.css";
import {
  Hits,
  InstantSearch,
  SearchBox,
  Configure,
  useSearchBox,
} from 'react-instantsearch-hooks-web';

import Hit from './Hit';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);


export const Search = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="plsfixe"
    >
      <Configure hitsPerPage={5} />
      <div className="ais-InstantSearch">
      <SearchBox className="search-box" placeholder="Search for a review or list..." />
      <CustomHits />
      </div>
    </InstantSearch>
  );
};

const CustomHits = () => {
  const { query } = useSearchBox();

  if (!query) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 bg-white shadow-lg z-50 max-h-64 overflow-auto">
      <Hits hitComponent={Hit} />
    </div>
  );
};


export default Search;
