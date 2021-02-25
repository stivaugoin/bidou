interface IdType<IdT> {
  _type: IdT;
}

type Id<T, IdT> = T & IdType<IdT>;
