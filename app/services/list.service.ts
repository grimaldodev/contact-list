const ListService = {
    getList: async () => {
        const requestURI = process.env.NEXT_PUBLIC_REQUEST_URI || '';

        const request = new Request(requestURI, {
            method: 'GET',
        });
        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(`An error just happen`);
        }

        return response.json();
    },
};

export default ListService;
