// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Generic Base Repository Pattern
// ═══════════════════════════════════════════════════════════

import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

export class BaseRepository<T extends Document> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data as T);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }

  async find(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    return await this.model.find(filter, null, options).exec();
  }

  async update(id: string, updateData: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return await this.model.countDocuments(filter).exec();
  }
}
