const asyncHandler = (requestHandler) => (req, res, next) => {
   return Promise.resolve(requestHandler(req, res, next))
        .catch((error) => next(error));
}


export { asyncHandler }