export default function getHooks({
  useState,
  useEffect,
  useCallback,
  message
}) {
  return {
    useFetchDataIds: function (fetchFunction, dependencies) {
      const [dataIds, setDataIds] = useState(null);
      const [isFetching, setIsFetching] = useState(false);

      const fetchData = useCallback(async () => {
        try {
          setIsFetching(true);
          const result = await fetchFunction();
          if (result && result.data) {
            setDataIds(result.data.map(({_id}) => _id));
          } else {
            setDataIds(null);
          }
        } catch(error) {
          message.error(error.message);
        } finally {
          setIsFetching(false);
        }
      }, dependencies);

      useEffect(() => {
        fetchData();
      }, dependencies);

      return [dataIds, isFetching];
    }
  }
}
