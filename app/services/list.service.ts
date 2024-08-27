const ListService = {
    getList: async (quantity?: number) => {
        const contactsURI = `${process.env.NEXT_PUBLIC_REQUEST_URI}/contacts`;
        const requestURI = quantity ? `${contactsURI}?q=${quantity}` : contactsURI;

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
