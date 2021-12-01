declare namespace Class {
  /**
   * Extract class property
   */
  type Property<Source, Key extends keyof Source> = Source[Key]
}
