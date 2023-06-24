export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      attributes: {
        Row: {
          created_at: string
          id: string
          name: string
          part_id: string
          updated_at: string
          user_id: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          part_id: string
          updated_at?: string
          user_id: string
          value?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          part_id?: string
          updated_at?: string
          user_id?: string
          value?: string
        }
      }
      ic_details: {
        Row: {
          created_at: string
          id: string
          mounting_type: string
          part_id: string
          pin_number: number
          series: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          mounting_type?: string
          part_id: string
          pin_number?: number
          series?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          mounting_type?: string
          part_id?: string
          pin_number?: number
          series?: string
          updated_at?: string
        }
      }
      order_details: {
        Row: {
          created_at: string
          id: string
          order_id: string
          part_id: string
          price_per_unit: number
          project_id: string | null
          quantity_ordered: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          part_id: string
          price_per_unit?: number
          project_id?: string | null
          quantity_ordered?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          part_id?: string
          price_per_unit?: number
          project_id?: string | null
          quantity_ordered?: number
          updated_at?: string
        }
      }
      orders: {
        Row: {
          created_at: string
          delivery_service: string
          delivery_status: string
          estimated_delivery_date: string | null
          id: string
          order_date: string
          supplier: string
          tracking: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_service?: string
          delivery_status?: string
          estimated_delivery_date?: string | null
          id?: string
          order_date: string
          supplier?: string
          tracking?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivery_service?: string
          delivery_status?: string
          estimated_delivery_date?: string | null
          id?: string
          order_date?: string
          supplier?: string
          tracking?: string
          updated_at?: string
          user_id?: string
        }
      }
      parts: {
        Row: {
          created_at: string
          datasheet_url: string
          description: string
          id: string
          manufacturer: string
          max_operating_temperature: number | null
          max_storage_temperature: number | null
          max_supply_current: number | null
          max_supply_voltage: number | null
          min_operating_temperature: number | null
          min_storage_temperature: number | null
          min_supply_current: number | null
          min_supply_voltage: number | null
          name: string
          operating_temperature_unit: string | null
          quantity_in_stock: number
          storage_temperature_unit: string | null
          supply_current_unit: string | null
          supply_voltage_unit: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          datasheet_url?: string
          description?: string
          id?: string
          manufacturer?: string
          max_operating_temperature?: number | null
          max_storage_temperature?: number | null
          max_supply_current?: number | null
          max_supply_voltage?: number | null
          min_operating_temperature?: number | null
          min_storage_temperature?: number | null
          min_supply_current?: number | null
          min_supply_voltage?: number | null
          name: string
          operating_temperature_unit?: string | null
          quantity_in_stock?: number
          storage_temperature_unit?: string | null
          supply_current_unit?: string | null
          supply_voltage_unit?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          datasheet_url?: string
          description?: string
          id?: string
          manufacturer?: string
          max_operating_temperature?: number | null
          max_storage_temperature?: number | null
          max_supply_current?: number | null
          max_supply_voltage?: number | null
          min_operating_temperature?: number | null
          min_storage_temperature?: number | null
          min_supply_current?: number | null
          min_supply_voltage?: number | null
          name?: string
          operating_temperature_unit?: string | null
          quantity_in_stock?: number
          storage_temperature_unit?: string | null
          supply_current_unit?: string | null
          supply_voltage_unit?: string | null
          updated_at?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          nickname: string | null
          profile_picture_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          nickname?: string | null
          profile_picture_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          nickname?: string | null
          profile_picture_url?: string | null
          updated_at?: string
          user_id?: string
        }
      }
      project_clusters: {
        Row: {
          cluster_status: string
          cluster_type: string
          created_at: string
          description: string
          end_date: string | null
          id: string
          name: string
          nickname: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cluster_status?: string
          cluster_type?: string
          created_at?: string
          description?: string
          end_date?: string | null
          id?: string
          name: string
          nickname?: string
          start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cluster_status?: string
          cluster_type?: string
          created_at?: string
          description?: string
          end_date?: string | null
          id?: string
          name?: string
          nickname?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
      }
      project_parts: {
        Row: {
          id: number
          part_id: string
          project_id: string
          quantity_used: number
        }
        Insert: {
          id?: number
          part_id: string
          project_id: string
          quantity_used?: number
        }
        Update: {
          id?: number
          part_id?: string
          project_id?: string
          quantity_used?: number
        }
      }
      project_tags: {
        Row: {
          id: number
          project_id: string
          tag_id: string
        }
        Insert: {
          id?: number
          project_id: string
          tag_id: string
        }
        Update: {
          id?: number
          project_id?: string
          tag_id?: string
        }
      }
      projects: {
        Row: {
          created_at: string
          description: string
          end_date: string | null
          id: string
          name: string
          nickname: string
          project_cluster_id: string | null
          project_status: string
          project_type: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          end_date?: string | null
          id?: string
          name: string
          nickname?: string
          project_cluster_id?: string | null
          project_status?: string
          project_type?: string
          start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string | null
          id?: string
          name?: string
          nickname?: string
          project_cluster_id?: string | null
          project_status?: string
          project_type?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
      }
      resistor_details: {
        Row: {
          created_at: string
          id: string
          material: string
          mounting_type: string
          part_id: string
          power_rating: number
          resistance: number
          tolerance: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          material?: string
          mounting_type?: string
          part_id: string
          power_rating?: number
          resistance?: number
          tolerance?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          material?: string
          mounting_type?: string
          part_id?: string
          power_rating?: number
          resistance?: number
          tolerance?: number
          updated_at?: string
        }
      }
      sbc_models: {
        Row: {
          analog_gpio_pins: number
          audio: boolean
          bluetooth: boolean
          cpu_count: number
          cpu_model: string
          created_at: string
          digital_gpio_pins: number
          dimensions: string
          ethernet: boolean
          gpu_model: string
          hdmi: boolean
          id: string
          memory: number
          micro_hdmi: boolean
          part_id: string
          power_consumption: number
          power_requirements: string
          sd_card: boolean
          storage_size: number
          storage_type: string
          storage_unit: string
          updated_at: string
          usb: boolean
          video: boolean
          weight: number
          wifi: boolean
        }
        Insert: {
          analog_gpio_pins?: number
          audio?: boolean
          bluetooth?: boolean
          cpu_count?: number
          cpu_model?: string
          created_at?: string
          digital_gpio_pins?: number
          dimensions?: string
          ethernet?: boolean
          gpu_model?: string
          hdmi?: boolean
          id?: string
          memory?: number
          micro_hdmi?: boolean
          part_id: string
          power_consumption?: number
          power_requirements?: string
          sd_card?: boolean
          storage_size?: number
          storage_type?: string
          storage_unit?: string
          updated_at?: string
          usb?: boolean
          video?: boolean
          weight?: number
          wifi?: boolean
        }
        Update: {
          analog_gpio_pins?: number
          audio?: boolean
          bluetooth?: boolean
          cpu_count?: number
          cpu_model?: string
          created_at?: string
          digital_gpio_pins?: number
          dimensions?: string
          ethernet?: boolean
          gpu_model?: string
          hdmi?: boolean
          id?: string
          memory?: number
          micro_hdmi?: boolean
          part_id?: string
          power_consumption?: number
          power_requirements?: string
          sd_card?: boolean
          storage_size?: number
          storage_type?: string
          storage_unit?: string
          updated_at?: string
          usb?: boolean
          video?: boolean
          weight?: number
          wifi?: boolean
        }
      }
      tags: {
        Row: {
          color: string
          created_at: string
          description: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_inventory: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          description: string
          manufacturer: string
          datasheet_url: string
          quantity_in_stock: number
          quantity_ordered: number
          orders_count: number
          created_at: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

